"""Assign stock numbers to the first four refreshed inventory vehicles.

Revision ID: 20261021_0028
Revises: 20261021_0027
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0028"
down_revision = "20261021_0027"
branch_labels = None
depends_on = None


STOCK_NUMBERS = {
    "2022-tesla-model-s-long-range": "BUC38417",
    "2021-ford-f150-raptor-supercrew": "BUC62753",
    "2024-ford-f150-raptor-supercrew": "BUC91528",
    "2021-tesla-model-s-long-range": "BUC47036",
}


def upgrade() -> None:
    table = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("stock_number", sa.String),
    )
    bind = op.get_bind()
    for slug, stock_number in STOCK_NUMBERS.items():
        bind.execute(
            table.update()
            .where(table.c.slug == slug)
            .values(stock_number=stock_number)
        )


def downgrade() -> None:
    table = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("stock_number", sa.String),
    )
    op.get_bind().execute(
        table.update()
        .where(table.c.slug.in_(list(STOCK_NUMBERS)))
        .values(stock_number=None)
    )
