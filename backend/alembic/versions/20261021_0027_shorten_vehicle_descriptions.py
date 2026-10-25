"""Shorten the first four vehicle descriptions to key equipment highlights.

Revision ID: 20261021_0027
Revises: 20261021_0026
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0027"
down_revision = "20261021_0026"
branch_labels = None
depends_on = None


DESCRIPTIONS = {
    "2022-tesla-model-s-long-range": (
        "Dual AC induction motors deliver 641 hp and 509 lb-ft through a single-speed direct-drive "
        "transaxle to all four wheels. Finished in Solid Black over a black cabin, it features 19-inch "
        "Tempest wheels, Active Air Suspension, a panoramic glass roof, heated and ventilated front "
        "seats, Autopilot, and a 17-inch touchscreen."
    ),
    "2021-ford-f150-raptor-supercrew": (
        "Twin-turbocharged 3.5L EcoBoost V6 rated at 450 hp and 510 lb-ft, paired with a 10-speed "
        "automatic, dual-range transfer case, Torsen front differential, and electronic-locking rear "
        "differential. Finished in Antimatter Blue over black Nirvana leather and cloth, with Fox Live "
        "Valve shocks, beadlock-capable 17-inch wheels, a twin-panel sunroof, heated and ventilated "
        "front seats, SYNC 4, and Bang & Olufsen audio."
    ),
    "2024-ford-f150-raptor-supercrew": (
        "Twin-turbocharged 3.5L EcoBoost V6 producing 450 hp and 510 lb-ft, paired with a 10-speed "
        "automatic, dual-range transfer case, and electronic-locking rear differential. Finished in "
        "Antimatter Blue over black leather and Alcantara, with Fox shocks, 17-inch wheels, a dual-panel "
        "sunroof, heated and ventilated front seats, adaptive cruise control, a head-up display, and "
        "Bang & Olufsen audio."
    ),
    "2021-tesla-model-s-long-range": (
        "Dual AC induction motors deliver 641 hp and 509 lb-ft through a single-speed direct-drive "
        "transaxle to all four wheels. Finished in Deep Blue Metallic over black premium leather, it "
        "features 21-inch Arachnid wheels, Active Air Suspension, a panoramic glass roof, heated and "
        "ventilated front seats, Autopilot, and a 17-inch touchscreen."
    ),
}


def _vehicle_table():
    return sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("short_description", sa.String),
        sa.column("description", sa.Text),
    )


def upgrade() -> None:
    table = _vehicle_table()
    bind = op.get_bind()
    for slug, description in DESCRIPTIONS.items():
        bind.execute(
            table.update()
            .where(table.c.slug == slug)
            .values(short_description=description, description=description)
        )


def downgrade() -> None:
    # Restore no long-form copy here: the previous import revision supplied
    # descriptions from source files, which are intentionally not duplicated.
    pass
