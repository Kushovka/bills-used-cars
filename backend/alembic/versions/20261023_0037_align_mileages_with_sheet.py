"""Align vehicle mileages with the latest inventory sheet.

Revision ID: 20261023_0037
Revises: 20261022_0036
Create Date: 2026-10-23
"""

from alembic import op
import sqlalchemy as sa


revision = "20261023_0037"
down_revision = "20261022_0036"
branch_labels = None
depends_on = None


UPDATED_MILEAGES = {
    "2022-ram-1500-trx-ignition-edition": 33711,
    "2024-ford-bronco-raptor": 8975,
    "2023-ram-1500-trx": 43728,
    "2022-lexus-gx460-black-line": 31355,
    "2022-tesla-model-s-long-range": 13321,
    "2021-tesla-model-s-long-range": 58487,
}

PREVIOUS_MILEAGES = {
    "2022-ram-1500-trx-ignition-edition": 1400,
    "2024-ford-bronco-raptor": 10975,
    "2023-ram-1500-trx": 42618,
    "2022-lexus-gx460-black-line": 30798,
    "2022-tesla-model-s-long-range": 46421,
    "2021-tesla-model-s-long-range": 55487,
}


def _set_mileages(values: dict[str, int]) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("mileage", sa.Integer),
        sa.column("details", sa.JSON),
    )
    connection = op.get_bind()

    for slug, mileage in values.items():
        row = connection.execute(
            sa.select(vehicles.c.details).where(vehicles.c.slug == slug)
        ).first()
        if row is None:
            continue

        details = dict(row.details or {})
        info = [dict(item) for item in details.get("info", [])]
        mileage_item = next(
            (item for item in info if str(item.get("label", "")).strip().lower() == "mileage"),
            None,
        )
        if mileage_item is None:
            info.insert(0, {"label": "Mileage", "value": f"{mileage:,} miles"})
        else:
            mileage_item["value"] = f"{mileage:,} miles"
        details["info"] = info

        connection.execute(
            sa.update(vehicles)
            .where(vehicles.c.slug == slug)
            .values(mileage=mileage, details=details)
        )


def upgrade() -> None:
    _set_mileages(UPDATED_MILEAGES)


def downgrade() -> None:
    _set_mileages(PREVIOUS_MILEAGES)
