# python-ai-template

AIペアプログラミング（Antigravity, Cursor, Claude Code, Copilot 等）を活用した、モダンで安全な Python 開発用スターターテンプレートです。

## 主な特徴

- **自動化ガードレール**: エディタ保存時に Ruff が自動整形・リント修正。コミット時に Git pre-commit フックで Pyright（型チェック）と Pytest（単体テスト）を自動検証。
- **コンテキスト節約**: AI自身に無駄なテスト・リントコマンドを実行させず、高速かつ低コストで実装を進めるための行動規範（`AGENTS.md`）を整備。
- **標準的な構成**: `src-layout`（`src/app`）を採用し、依存管理・ツール実行には高速パッケージマネージャ `uv` を使用。

## クイックスタート（新規プロジェクト開始時）

GitHub の「Use this template」からリポジトリを作成後、以下を実行して開発を開始します。

### 1. 前提ツール
- Python 3.11+
- [uv](https://github.com/astral-sh/uv)
- Git

### 2. 環境の初期化（3ステップ）
```bash
# 1. 依存関係のインストール（仮想環境 .venv の自動作成）
uv sync

# 2. 環境変数ファイルの準備
cp .env.example .env

# 3. Git フックの有効化（コミット前チェックの自動化）
git config core.hooksPath .githooks
```

### 3. 実行確認
```bash
# アプリケーションの実行
uv run python -m app.main
```

---

## 既存リポジトリへの導入（手動移植ガイド）

既存プロジェクトに本テンプレートの「AIペアプロ環境」を安全に取り入れる場合は、以下の設定を既存環境に合わせて手動でマージしてください。

1. **AI 行動規範**:
   - `AGENTS.md` をプロジェクト直下に配置（プロジェクトの事情に合わせて微調整）。
2. **コミット前自動チェック**:
   - `.githooks/pre-commit`, `.githooks/commit-msg` を配置し、`git config core.hooksPath .githooks` を実行。
   - ※すでにフックツール（Huskyやpre-commit framework等）を使用している場合は、既存フック内に `uv run pyright` と `uv run pytest` を追記。
3. **エディタ保存時自動整形**:
   - `.vscode/settings.json` の Ruff 関連設定を既存の設定ファイルにマージ。
   - `.vscode/extensions.json` の推奨拡張機能（Ruff, Pyright, Python）をマージ。
4. **AI コンテキスト保護**:
   - `.agentignore` / `.geminiignore` をプロジェクト直下に配置（`.env` や未整理メモの AI 読み込みを遮断）。
