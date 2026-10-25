"""Remove the 2022 Cadillac Escalade Premium Luxury from inventory.

Revision ID: 20261014_0024
Revises: 20261014_0023
Create Date: 2026-10-14
"""

from alembic import op
import sqlalchemy as sa


revision = "20261014_0024"
down_revision = "20261014_0023"
branch_labels = None
depends_on = None


VEHICLE_SLUG = "2022-cadillac-escalade-premium-luxury-4wd"
VEHICLE_BACKUP = "_vehicle_backup_20261014_0024"
LEAD_BACKUP = "_lead_backup_20261014_0024"


def upgrade() -> None:
    connection = op.get_bind()
    connection.execute(sa.text(
        f"CREATE TABLE {VEHICLE_BACKUP} AS "
        "SELECT * FROM vehicles WHERE slug = :slug"
    ), {"slug": VEHICLE_SLUG})
    connection.execute(sa.text(
        f"CREATE TABLE {LEAD_BACKUP} AS "
        "SELECT id, vehicle_id FROM leads "
        "WHERE vehicle_id IN (SELECT id FROM vehicles WHERE slug = :slug)"
    ), {"slug": VEHICLE_SLUG})
    connection.execute(sa.text(
        "UPDATE leads SET vehicle_id = NULL "
        "WHERE vehicle_id IN (SELECT id FROM vehicles WHERE slug = :slug)"
    ), {"slug": VEHICLE_SLUG})
    connection.execute(
        sa.text("DELETE FROM vehicles WHERE slug = :slug"),
        {"slug": VEHICLE_SLUG},
    )


def downgrade() -> None:
    connection = op.get_bind()
    connection.execute(sa.text(
        f"INSERT INTO vehicles SELECT * FROM {VEHICLE_BACKUP}"
    ))
    connection.execute(sa.text(
        f"UPDATE leads SET vehicle_id = backup.vehicle_id "
        f"FROM {LEAD_BACKUP} AS backup WHERE leads.id = backup.id"
    ))
    op.drop_table(LEAD_BACKUP)
    op.drop_table(VEHICLE_BACKUP)
