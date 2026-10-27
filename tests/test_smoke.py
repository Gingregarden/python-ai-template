from app.main import main


def test_smoke() -> None:
    """Basic smoke test to ensure test runner works."""
    assert callable(main)

