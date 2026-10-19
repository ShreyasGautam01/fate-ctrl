import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
import control_model_enumerator as e  # noqa: E402


class ControlModelEnumeratorTests(unittest.TestCase):
    def test_fixture_has_consistent_machine_contract(self):
        e.validate_fixture()
        self.assertEqual(e.FIXTURE["initialState"]["remaining"], e.FIXTURE["rounds"])
        self.assertEqual(e.FIXTURE["worldFacts"]["threadInspectedInitially"], e.FIXTURE["initialState"]["inspected"])
        self.assertEqual(set(e.POLICY["tieBreakOrderHighestFirst"]), set(e.ACTIONS))

    def test_fixture_validation_rejects_duplicate_tie_breaks_and_wrong_terminal_boundary(self):
        tie_order = e.POLICY["tieBreakOrderHighestFirst"]
        try:
            e.POLICY["tieBreakOrderHighestFirst"] = [*tie_order, tie_order[0]]
            with self.assertRaisesRegex(ValueError, "every action exactly once"):
                e.validate_fixture()
        finally:
            e.POLICY["tieBreakOrderHighestFirst"] = tie_order

        rounds = e.FIXTURE["rounds"]
        remaining = e.FIXTURE["initialState"]["remaining"]
        try:
            e.FIXTURE["rounds"] = rounds + 1
            e.FIXTURE["initialState"]["remaining"] = remaining + 1
            with self.assertRaisesRegex(ValueError, "objective evaluation boundary"):
                e.validate_fixture()
        finally:
            e.FIXTURE["rounds"] = rounds
            e.FIXTURE["initialState"]["remaining"] = remaining

    def test_fixture_rejects_unsupported_signal_composition(self):
        composition = e.FIXTURE["composition"]
        original_opposite = composition["oppositeSignals"]
        original_private = composition["privateWindowSignal"]
        try:
            composition["oppositeSignals"] = "average"
            with self.assertRaisesRegex(ValueError, "opposite-signal composition"):
                e.validate_fixture()
            composition["oppositeSignals"] = original_opposite
            composition["privateWindowSignal"] = "ignore"
            with self.assertRaisesRegex(ValueError, "private-window signal composition"):
                e.validate_fixture()
        finally:
            composition["oppositeSignals"] = original_opposite
            composition["privateWindowSignal"] = original_private

    def test_fixture_rejects_fractional_or_boolean_influence_signals(self):
        influence = e.FIXTURE["influences"]["THREAD_UP"]
        original_signal = influence["signal"]
        try:
            influence["signal"] = 0.5
            with self.assertRaisesRegex(ValueError, "non-integral selector signal"):
                e.validate_fixture()
            influence["signal"] = True
            with self.assertRaisesRegex(ValueError, "non-integral selector signal"):
                e.validate_fixture()
        finally:
            influence["signal"] = original_signal

    def test_authored_success_routes_are_reachable_in_both_models(self):
        result = e.run_assertions()
        self.assertTrue(result["objectiveRoutesPassed"])
        for model in (e.I, e.W):
            self.assertEqual(set(result["routes"][model]), {"AOnly", "BOnly", "Both"})

    def test_direct_intention_can_change_choice_against_competing_proposal(self):
        state = e.State()
        # With only B's inspection proposal, inspection wins.
        _, b_only = e.transition(state, e.I, (e.PASS, e.INSPECT))
        self.assertEqual(b_only["selected"], e.INSPECT)
        # Adding A's conflicting return proposal balances support; the character tie-break selects return.
        _, conflict = e.transition(state, e.I, (e.RETURN, e.INSPECT))
        self.assertEqual(conflict["selected"], e.RETURN)

    def test_thread_influence_can_change_default_choice(self):
        state = e.State()
        _, baseline = e.transition(state, e.W, (e.PASS, e.PASS))
        _, influenced = e.transition(state, e.W, ("THREAD_UP", e.PASS))
        self.assertEqual(baseline["selected"], e.RETURN)
        self.assertEqual(influenced["selected"], e.INSPECT)

    def test_opposite_prominence_inputs_cancel(self):
        state = e.State()
        signals, private_window, effects = e.resolve_influences(state, ("THREAD_UP", "THREAD_DOWN"))
        self.assertEqual(signals[e.INSPECT], 0)
        self.assertFalse(private_window)
        self.assertEqual(effects[0]["signal"], 0)

    def test_private_window_promotes_presentation_and_prevents_trust_loss(self):
        state = e.State(round_no=2, remaining=2, inspected=True)
        _, exposed = e.transition(state, e.W, ("EVIDENCE_UP", e.PASS))
        _, private = e.transition(state, e.W, ("OPEN_PRIVATE_WINDOW", e.PASS))
        self.assertEqual(exposed["selected"], e.PRESENT)
        self.assertEqual(exposed["after"]["trust"], 0)
        self.assertEqual(private["selected"], e.PRESENT)
        self.assertEqual(private["after"]["trust"], 1)
        self.assertIn("EvidencePresented", private["events"])
        self.assertNotIn("JulesLearnedPhotoAndSeededMessage", private["events"])

    def test_private_window_and_evidence_down_cancel_signal_but_keep_privacy(self):
        state = e.State(round_no=2, remaining=2, inspected=True)
        signals, private_window, _ = e.resolve_influences(state, ("EVIDENCE_DOWN", "OPEN_PRIVATE_WINDOW"))
        self.assertEqual(signals[e.PRESENT], 0)
        self.assertTrue(private_window)

    def test_selector_never_returns_an_illegal_action_for_enumerated_inputs(self):
        for model in (e.I, e.W):
            _, states, _, _, _ = e._all_paths(model)
            for state in states.values():
                opts = e.options(state, model)
                for a in opts:
                    for b in opts:
                        _, result = e.transition(state, model, (a, b))
                        self.assertIn(result["selected"], result["legalActions"])
                        self.assertIsNotNone(result["decisiveField"])

    def test_all_models_have_input_sensitivity_and_reachable_objectives(self):
        for model in (e.I, e.W):
            result = e.enumerate_model(model)
            self.assertTrue(result["objectiveAReachable"])
            self.assertTrue(result["objectiveBReachable"])
            self.assertTrue(result["bothObjectivesReachable"])
            sensitivity = result["conditionalInputSensitivity"]
            self.assertGreater(sensitivity["p1ChangedAction"], 0)
            self.assertGreater(sensitivity["p2ChangedAction"], 0)
            active_inputs = set(e.DIRECT) if model == e.I else {
                "THREAD_UP", "THREAD_DOWN", "EVIDENCE_UP", "EVIDENCE_DOWN", "OPEN_PRIVATE_WINDOW"
            }
            for input_name in active_inputs:
                self.assertGreater(sensitivity["perSubmission"][input_name]["changedAction"], 0, (model, input_name))

    def test_same_inputs_replay_identically(self):
        for model in (e.I, e.W):
            first = e.transition(e.State(), model, (e.PASS, e.PASS))[1]
            second = e.transition(e.State(), model, (e.PASS, e.PASS))[1]
            self.assertEqual(json.dumps(first, sort_keys=True), json.dumps(second, sort_keys=True))

    def test_each_round_requires_exactly_two_player_submissions(self):
        with self.assertRaisesRegex(ValueError, "exactly two player submissions"):
            e.transition(e.State(), e.I, (e.PASS,))
        with self.assertRaisesRegex(ValueError, "exactly two player submissions"):
            e.transition(e.State(), e.I, (e.PASS, e.PASS, e.PASS))
        with self.assertRaisesRegex(ValueError, "exactly two player submissions"):
            e.transition(e.State(), e.I, None)

    def test_terminal_state_rejects_more_inputs(self):
        with self.assertRaises(ValueError):
            e.transition(e.State(round_no=4, remaining=0), e.I, (e.PASS, e.PASS))

    def test_invalid_submission_is_rejected(self):
        with self.assertRaises(ValueError):
            e.transition(e.State(), e.I, (e.PRESENT, e.PASS))
        with self.assertRaises(ValueError):
            e.transition(e.State(), e.W, ("EVIDENCE_UP", e.PASS))
        with self.assertRaises(ValueError):
            e.transition(e.State(), e.W, ("OPEN_PRIVATE_WINDOW", e.PASS))


if __name__ == "__main__":
    unittest.main(verbosity=2)
