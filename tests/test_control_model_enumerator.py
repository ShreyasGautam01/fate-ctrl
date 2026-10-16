import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
import control_model_enumerator as e  # noqa: E402


class ControlModelEnumeratorTests(unittest.TestCase):
    def test_authored_success_routes_are_reachable_in_both_models(self):
        result = e.run_assertions()
        self.assertTrue(result["explicit_objective_routes_passed"])
        for model in (e.MODEL_I, e.MODEL_W):
            self.assertEqual(set(result["expected_routes"][model]), {"A_only", "B_only", "both"})

    def test_direct_intention_can_change_choice_against_competing_proposal(self):
        state = e.State()
        # With only B's inspection proposal, inspection wins.
        _, b_only = e.transition(state, e.MODEL_I, (e.PASS, e.INSPECT))
        self.assertEqual(b_only["selected_action"], e.INSPECT)
        # Adding A's conflicting return proposal balances support; the character tie-break selects return.
        _, conflict = e.transition(state, e.MODEL_I, (e.RETURN, e.INSPECT))
        self.assertEqual(conflict["selected_action"], e.RETURN)

    def test_thread_influence_can_change_default_choice(self):
        state = e.State()
        _, baseline = e.transition(state, e.MODEL_W, (e.PASS, e.PASS))
        _, influenced = e.transition(state, e.MODEL_W, ("THREAD_UP", e.PASS))
        self.assertEqual(baseline["selected_action"], e.RETURN)
        self.assertEqual(influenced["selected_action"], e.INSPECT)

    def test_opposite_prominence_inputs_cancel(self):
        state = e.State()
        signals, private_window, effects = e.resolve_w_influences(state, ("THREAD_UP", "THREAD_DOWN"))
        self.assertEqual(signals[e.INSPECT], 0)
        self.assertFalse(private_window)
        self.assertEqual(effects[0]["signal"], 0)

    def test_private_window_promotes_presentation_and_prevents_trust_loss(self):
        state = e.State(round_no=2, remaining=2, inspected=True)
        _, exposed = e.transition(state, e.MODEL_W, ("EVIDENCE_UP", e.PASS))
        _, private = e.transition(state, e.MODEL_W, ("OPEN_PRIVATE_WINDOW", e.PASS))
        self.assertEqual(exposed["selected_action"], e.PRESENT)
        self.assertEqual(exposed["state_after"]["trust"], 0)
        self.assertEqual(private["selected_action"], e.PRESENT)
        self.assertEqual(private["state_after"]["trust"], 1)
        self.assertIn("EvidencePresented", private["events"])
        self.assertNotIn("JulesLearnedPhotoAndSeededMessage", private["events"])

    def test_private_window_and_evidence_down_cancel_signal_but_keep_privacy(self):
        state = e.State(round_no=2, remaining=2, inspected=True)
        signals, private_window, _ = e.resolve_w_influences(state, ("EVIDENCE_DOWN", "OPEN_PRIVATE_WINDOW"))
        self.assertEqual(signals[e.PRESENT], 0)
        self.assertTrue(private_window)

    def test_selector_never_returns_an_illegal_action_for_enumerated_inputs(self):
        for model in (e.MODEL_I, e.MODEL_W):
            _, states, _, _, _ = e._terminal_paths(model)
            for state in states.values():
                options = e.input_options(state, model)
                for a in options:
                    for b in options:
                        _, result = e.transition(state, model, (a, b))
                        self.assertIn(result["selected_action"], result["legal_actions_at_selection"])
                        self.assertIsNotNone(result["decisive_rank_field_vs_runner_up"])

    def test_all_models_have_input_sensitivity_and_reachable_objectives(self):
        for model in (e.MODEL_I, e.MODEL_W):
            result = e.enumerate_model(model)
            self.assertTrue(result["objective_A_reachable"])
            self.assertTrue(result["objective_B_reachable"])
            self.assertTrue(result["both_objectives_reachable"])
            sensitivity = result["conditional_input_sensitivity"]
            self.assertGreater(sensitivity["p1_changed_selected_action"], 0)
            self.assertGreater(sensitivity["p2_changed_selected_action"], 0)
            active_inputs = set(e.DIRECT_PROPOSALS) if model == e.MODEL_I else {
                "THREAD_UP", "THREAD_DOWN", "EVIDENCE_UP", "EVIDENCE_DOWN", "OPEN_PRIVATE_WINDOW"
            }
            for input_name in active_inputs:
                self.assertGreater(
                    sensitivity["per_submission"][input_name]["changed_action"],
                    0,
                    (model, input_name),
                )

    def test_same_inputs_replay_identically(self):
        for model in (e.MODEL_I, e.MODEL_W):
            first = e.transition(e.State(), model, (e.PASS, e.PASS))[1]
            second = e.transition(e.State(), model, (e.PASS, e.PASS))[1]
            self.assertEqual(json.dumps(first, sort_keys=True), json.dumps(second, sort_keys=True))

    def test_terminal_state_rejects_more_inputs(self):
        with self.assertRaises(ValueError):
            e.transition(e.State(round_no=4, remaining=0), e.MODEL_I, (e.PASS, e.PASS))

    def test_invalid_submission_is_rejected(self):
        with self.assertRaises(ValueError):
            e.transition(e.State(), e.MODEL_I, (e.PRESENT, e.PASS))
        with self.assertRaises(ValueError):
            e.transition(e.State(), e.MODEL_W, ("EVIDENCE_UP", e.PASS))


if __name__ == "__main__":
    unittest.main(verbosity=2)
