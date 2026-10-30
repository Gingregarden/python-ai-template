"""pytest の共通フィクスチャおよび設定を定義するモジュール。"""

import pytest


@pytest.fixture(autouse=True)
def setup_test_env(monkeypatch: pytest.MonkeyPatch) -> None:
    """すべてのテストで安全に動作するよう環境変数をテスト用に固定・隔離する。"""
    monkeypatch.setenv("APP_ENV", "test")
    monkeypatch.setenv("LOG_LEVEL", "DEBUG")


# --- 今後の拡張用サンプル（非同期フィクスチャやDB/クライアントのモックなど） ---
# @pytest.fixture
# def sample_resource() -> Generator[str, None, None]:
#     """リソースのセットアップとクリーンアップの例。"""
#     resource = "initialized"
#     yield resource
#     # teardown 処理をここに記述
