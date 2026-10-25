"""Add a little more detail to the first four vehicle summaries.

Revision ID: 20261021_0029
Revises: 20261021_0028
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0029"
down_revision = "20261021_0028"
branch_labels = None
depends_on = None


DESCRIPTIONS = {
    "2022-tesla-model-s-long-range": (
        "Dual AC induction motors deliver 641 hp and 509 lb-ft through a single-speed direct-drive "
        "transaxle to all four wheels. Finished in Solid Black over a black cabin, this Model S rides "
        "on 19-inch Tempest wheels and features Active Air Suspension, regenerative braking, and a "
        "panoramic glass roof. The interior adds heated and ventilated front seats, a heated rear "
        "bench, Autopilot, a 12-speaker sound system, and a 17-inch touchscreen."
    ),
    "2021-ford-f150-raptor-supercrew": (
        "The 3.5L twin-turbocharged EcoBoost V6 produces 450 hp and 510 lb-ft, paired with a 10-speed "
        "automatic, dual-range transfer case, Torsen limited-slip front differential, and an "
        "electronically locking rear differential. Finished in Antimatter Blue Metallic over black Nirvana leather "
        "with cloth inserts, this Raptor has Fox Live Valve shocks, beadlock-capable 17-inch wheels, "
        "and a twin-panel sunroof. The cabin includes heated and ventilated front seats, heated rear "
        "seats, SYNC 4 with a 12-inch touchscreen, and an 18-speaker Bang & Olufsen system."
    ),
    "2024-ford-f150-raptor-supercrew": (
        "The 3.5L twin-turbocharged EcoBoost V6 produces 450 hp and 510 lb-ft, paired with a 10-speed "
        "automatic, dual-range transfer case, and electronic-locking rear differential. Finished in "
        "Antimatter Blue Metallic over black leather and Alcantara suede, this Raptor is equipped with "
        "Fox shocks, 17-inch wheels, a dual-panel sunroof, and a tonneau cover. Comfort and technology "
        "highlights include heated and ventilated front seats, heated rear seats, adaptive cruise "
        "control, a 360-degree camera, a head-up display, SYNC 4, and Bang & Olufsen audio."
    ),
    "2021-tesla-model-s-long-range": (
        "Dual AC induction motors deliver 641 hp and 509 lb-ft through a single-speed direct-drive "
        "transaxle to all four wheels. Finished in Deep Blue Metallic over black premium leather, this "
        "Model S rides on 21-inch Arachnid wheels with Michelin Pilot Sport 4S tires and features "
        "Active Air Suspension, regenerative braking, and a panoramic glass roof. The cabin includes "
        "heated and ventilated front seats, heated rear seats, Autopilot, a 12-speaker sound system, "
        "and a 17-inch touchscreen."
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
    # The prior summaries are retained in revision 20261021_0027.
    from importlib.util import module_from_spec, spec_from_file_location
    from pathlib import Path

    prior_path = Path(__file__).with_name("20261021_0027_shorten_vehicle_descriptions.py")
    spec = spec_from_file_location("prior_vehicle_descriptions", prior_path)
    prior_revision = module_from_spec(spec)
    spec.loader.exec_module(prior_revision)
    table = _vehicle_table()
    bind = op.get_bind()
    for slug, description in prior_revision.DESCRIPTIONS.items():
        bind.execute(
            table.update()
            .where(table.c.slug == slug)
            .values(short_description=description, description=description)
        )
