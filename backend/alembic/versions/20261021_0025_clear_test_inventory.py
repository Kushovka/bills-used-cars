"""Clear the previous project's test inventory.

Revision ID: 20261021_0025
Revises: 20261014_0024
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0025"
down_revision = "20261014_0024"
branch_labels = None
depends_on = None


VEHICLE_BACKUP = "_vehicle_backup_20261021_0025"
LEAD_BACKUP = "_lead_backup_20261021_0025"


def upgrade() -> None:
    connection = op.get_bind()
    connection.execute(sa.text(
        f"CREATE TABLE {VEHICLE_BACKUP} AS SELECT * FROM vehicles"
    ))
    connection.execute(sa.text(
        f"CREATE TABLE {LEAD_BACKUP} AS "
        "SELECT id, vehicle_id FROM leads WHERE vehicle_id IS NOT NULL"
    ))
    connection.execute(sa.text("UPDATE leads SET vehicle_id = NULL WHERE vehicle_id IS NOT NULL"))
    connection.execute(sa.text("DELETE FROM vehicles"))


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
