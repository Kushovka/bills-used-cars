"""Import the first four vehicles supplied for the refreshed inventory.

Revision ID: 20261021_0026
Revises: 20261021_0025
Create Date: 2026-10-21
"""

from datetime import datetime
from uuid import uuid4

from alembic import op
import sqlalchemy as sa


revision = "20261021_0026"
down_revision = "20261021_0025"
branch_labels = None
depends_on = None


VEHICLES = [
    {
        "slug": "2022-tesla-model-s-long-range",
        "title": "2022 Tesla Model S Long Range AWD",
        "make": "Tesla",
        "model": "Model S",
        "trim": "Long Range AWD",
        "year": 2022,
        "price": 0,
        "mileage": 15000,
        "body_type": "Sedan",
        "transmission": "Single-Speed Direct-Drive",
        "drivetrain": "All-Wheel Drive (AWD)",
        "engine": "Dual AC Induction Electric Motors",
        "exterior_color": "Solid Black",
        "interior_color": "Black",
        "short_description": "Long Range electric sedan with dual motors, all-wheel drive, and 15,000 miles.",
        "description": (
            "Finished in Solid Black, this Model S has a panoramic glass roof, a power liftgate, "
            "LED headlights, and 19-inch Tempest alloy wheels with Continental ProContact tires. "
            "It is equipped with Active Air Suspension and regenerative braking with four-piston "
            "aluminum calipers over vented discs at all four wheels. An additional set of wheels "
            "with Continental tires is included.\n\n"
            "The cabin has black upholstery, heated and ventilated power-adjustable front seats, "
            "a heated rear bench, a yoke-style steering wheel, and a configurable digital display. "
            "Convenience and technology features include Autopilot, automatic climate control, "
            "cruise control, a 12-speaker sound system, and a 17-inch touchscreen.\n\n"
            "Dual three-phase AC induction motors send power to all four wheels through a "
            "single-speed direct-drive transaxle. The digital odometer reads 15,000 miles. "
            "The vehicle history report notes minor damage in June 2024."
        ),
        "features": [
            "Dual AC Induction Electric Motors",
            "Single-Speed Direct-Drive Transaxle",
            "All-Wheel Drive",
            "15,000 Miles",
            "Solid Black Paint",
            "Black Upholstery",
            "19-inch Tempest Alloy Wheels",
            "Continental ProContact Tires",
            "Additional Wheels with Continental Tires",
            "Active Air Suspension",
            "Regenerative Braking",
            "Parking Sensors",
            "Panoramic Glass Roof",
            "Power Liftgate",
            "LED Headlights",
            "Heated and Ventilated Front Seats",
            "Heated Rear Bench",
            "Autopilot",
            "12-Speaker Sound System",
            "17-inch Touchscreen",
            "Automatic Climate Control",
            "Cruise Control",
            "Yoke-Style Steering Wheel",
            "Configurable Digital Display",
        ],
        "specs": {"power": "641 hp", "torque": "509 lb-ft"},
        "images_total": 66,
    },
    {
        "slug": "2021-ford-f150-raptor-supercrew",
        "title": "2021 Ford F-150 Raptor SuperCrew",
        "make": "Ford",
        "model": "F-150",
        "trim": "Raptor SuperCrew",
        "year": 2021,
        "price": 0,
        "mileage": 39000,
        "body_type": "Truck",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "3.5L Twin-Turbocharged V6",
        "exterior_color": "Antimatter Blue Metallic",
        "interior_color": "Black Nirvana Leather",
        "short_description": "Raptor SuperCrew with a twin-turbo V6, 4WD, and 39,000 miles.",
        "description": (
            "This Raptor SuperCrew is finished in Antimatter Blue Metallic and has black Nirvana "
            "leather upholstery with cloth inserts. It rides on 17-inch matte-black forged-aluminum "
            "beadlock-capable wheels with 315/70 BFGoodrich All-Terrain KO2 tires installed in 2025. "
            "Fox Racing Live Valve shocks, Terrain Management System, and Trail Control support "
            "its off-road capability. Equipment packages include Convenience, Raptor Carbon Fiber, "
            "Power Tech, and Tow Technology.\n\n"
            "The cabin includes heated and ventilated front seats, heated rear seats, a heated "
            "multifunction steering wheel with paddle shifters, and an auxiliary switch bank. "
            "Technology includes SYNC 4 with a 12-inch touchscreen, Apple CarPlay, Android Auto, "
            "a Wi-Fi hotspot, a 360-degree camera, lane-keeping assistance, blind-spot monitoring, "
            "cross-traffic alert, and an 18-speaker Bang & Olufsen sound system. Tow Technology "
            "adds Pro Trailer Backup Assist, Trailer Reverse Guidance, an integrated trailer brake "
            "controller, and Smart Trailer Tow Connector. One rear cup-holder spring does not have tension.\n\n"
            "The 3.5-liter twin-turbocharged EcoBoost V6 is rated at 450 horsepower and 510 lb-ft "
            "of torque. Power is delivered through a 10-speed automatic transmission, a dual-range "
            "transfer case, a Torsen limited-slip front differential, and an electronically locking "
            "rear differential. The odometer reads 39,000 miles. The oil was changed in 2025. "
            "The vehicle history report shows no accidents or other damage and lists open manufacturer recalls."
        ),
        "features": [
            "3.5L Twin-Turbocharged EcoBoost V6",
            "450 hp and 510 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Torsen Limited-Slip Front Differential",
            "Electronically Locking Rear Differential",
            "Four-Wheel Drive",
            "39,000 Miles",
            "Antimatter Blue Metallic Paint",
            "Black Nirvana Leather with Cloth Inserts",
            "17-inch Matte-Black Forged-Aluminum Wheels",
            "315/70 BFGoodrich All-Terrain KO2 Tires",
            "Fox Racing Live Valve Shocks",
            "Terrain Management System and Trail Control",
            "Convenience, Raptor Carbon Fiber, Power Tech, and Tow Technology Packages",
            "Twin-Panel Sunroof",
            "Heated and Ventilated Front Seats",
            "Heated Rear Seats",
            "SYNC 4 with 12-inch Touchscreen",
            "Apple CarPlay and Android Auto",
            "Wi-Fi Hotspot",
            "360-Degree Camera",
            "Lane-Keeping Assistance and Blind-Spot Monitoring",
            "Cross-Traffic Alert",
            "18-Speaker Bang & Olufsen Sound System",
            "Pro Trailer Backup Assist and Trailer Reverse Guidance",
            "Integrated Trailer Brake Controller",
            "Smart Trailer Tow Connector",
            "Oil Changed in 2025",
            "Vehicle History Report Shows No Accidents or Other Damage",
            "Open Manufacturer Recalls Listed",
        ],
        "specs": {"power": "450 hp", "torque": "510 lb-ft"},
        "images_total": 177,
    },
    {
        "slug": "2024-ford-f150-raptor-supercrew",
        "title": "2024 Ford F-150 Raptor SuperCrew",
        "make": "Ford",
        "model": "F-150",
        "trim": "Raptor SuperCrew",
        "year": 2024,
        "price": 0,
        "mileage": 22000,
        "body_type": "Truck",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "3.5L Twin-Turbocharged V6",
        "exterior_color": "Antimatter Blue Metallic",
        "interior_color": "Black Leather and Alcantara Suede",
        "short_description": "Raptor SuperCrew with a twin-turbo V6, 4WD, and 22,000 miles.",
        "description": (
            "Finished in Antimatter Blue Metallic over black leather and Alcantara suede, this "
            "Raptor SuperCrew is equipped with 17-inch cast-aluminum wheels, Fox Racing shocks, "
            "a dual-panel sunroof, and a tonneau cover. Exterior equipment includes a keyless-entry "
            "pad, automatic LED headlights, Rigid LED fog lights, mirror lighting, black wheel-arch "
            "flares, running boards, a power-sliding rear window, a spray-in bedliner, and a "
            "power-operated tailgate with a deployable step.\n\n"
            "The cabin has heated and ventilated power-adjustable front seats, heated outboard rear "
            "seats, power-adjustable pedals, dual-zone automatic climate control, and a heated "
            "leather-wrapped steering wheel with paddle shifters. Features include adaptive cruise "
            "control, a 360-degree camera system, a head-up display, wireless charging, an auxiliary "
            "switch bank, an integrated trailer brake controller, SYNC 4 with a 12-inch touchscreen, "
            "Apple CarPlay, Android Auto, and an 18-speaker Bang & Olufsen sound system.\n\n"
            "The 3.5-liter twin-turbocharged EcoBoost V6 is rated at 450 horsepower and 510 lb-ft "
            "of torque. A 10-speed automatic transmission, dual-range transfer case, and electronically "
            "locking rear differential route power to the rear or all four wheels. The odometer reads "
            "22,000 miles. The oil was changed in June 2026. The vehicle history report shows no "
            "accidents and lists an open recall and an open customer-satisfaction program."
        ),
        "features": [
            "3.5L Twin-Turbocharged EcoBoost V6",
            "450 hp and 510 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Electronically Locking Rear Differential",
            "Four-Wheel Drive",
            "22,000 Miles",
            "Antimatter Blue Metallic Paint",
            "Black Leather and Alcantara Suede Upholstery",
            "17-inch Cast-Aluminum Wheels",
            "Fox Racing Shocks",
            "Dual-Panel Sunroof",
            "Tonneau Cover",
            "Heated and Ventilated Front Seats",
            "Heated Outboard Rear Seats",
            "Power-Adjustable Pedals",
            "Dual-Zone Automatic Climate Control",
            "Adaptive Cruise Control",
            "360-Degree Camera System",
            "Head-Up Display",
            "Wireless Charging",
            "18-Speaker Bang & Olufsen Sound System",
            "SYNC 4 with 12-inch Touchscreen",
            "Apple CarPlay and Android Auto",
            "Integrated Trailer Brake Controller",
            "Power-Sliding Rear Window",
            "Spray-In Bedliner",
            "Power Tailgate with Deployable Step",
            "Oil Changed in June 2026",
            "Vehicle History Report Shows No Accidents",
            "Open Recall and Customer-Satisfaction Program Listed",
        ],
        "specs": {"power": "450 hp", "torque": "510 lb-ft"},
        "images_total": 165,
    },
    {
        "slug": "2021-tesla-model-s-long-range",
        "title": "2021 Tesla Model S Long Range AWD",
        "make": "Tesla",
        "model": "Model S",
        "trim": "Long Range AWD",
        "year": 2021,
        "price": 0,
        "mileage": 29000,
        "body_type": "Sedan",
        "transmission": "Single-Speed Direct-Drive",
        "drivetrain": "All-Wheel Drive (AWD)",
        "engine": "Dual AC Induction Electric Motors",
        "exterior_color": "Deep Blue Metallic",
        "interior_color": "Black Premium Leather",
        "short_description": "Long Range electric sedan with dual motors, all-wheel drive, and 29,000 miles.",
        "description": (
            "Finished in Deep Blue Metallic, this Model S features a panoramic glass roof, a power "
            "liftgate, LED headlights, and 21-inch Arachnid alloy wheels with Michelin Pilot Sport 4S "
            "tires. Active Air Suspension and regenerative braking with four-piston aluminum calipers "
            "over vented discs are fitted at all four corners.\n\n"
            "The cabin is upholstered in black premium leather and includes heated and ventilated "
            "power-adjustable front seats, heated rear seats, a yoke-style steering wheel, and a "
            "configurable digital display. Equipment includes Autopilot, automatic climate control, "
            "cruise control, a 12-speaker sound system, a 17-inch touchscreen, and all-weather front "
            "mats with blue center lines.\n\n"
            "Dual three-phase AC induction motors send power to all four wheels through a single-speed "
            "direct-drive transaxle. The digital odometer reads 29,000 miles; the source rounds this "
            "to 30,000 miles. The vehicle history report shows no accidents or other reported damage."
        ),
        "features": [
            "Dual AC Induction Electric Motors",
            "641 hp and 509 lb-ft of Torque",
            "Single-Speed Direct-Drive Transaxle",
            "All-Wheel Drive",
            "29,000 Miles (rounded to 30,000 in the source)",
            "Deep Blue Metallic Paint",
            "Black Premium Leather Upholstery",
            "21-inch Arachnid Alloy Wheels",
            "Michelin Pilot Sport 4S Tires",
            "Panoramic Glass Roof",
            "LED Headlights",
            "Active Air Suspension",
            "Autopilot",
            "Yoke-Style Steering Wheel",
            "Heated and Ventilated Front Seats",
            "Heated Rear Seats",
            "12-Speaker Sound System",
            "17-inch Touchscreen",
            "Automatic Climate Control",
            "Cruise Control",
            "All-Weather Front Mats with Blue Center Lines",
            "Vehicle History Report Shows No Accidents or Other Reported Damage",
        ],
        "specs": {"power": "641 hp", "torque": "509 lb-ft"},
        "images_total": 84,
    },
]


def _vehicle_table():
    return sa.table(
        "vehicles",
        sa.column("id", sa.String),
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("make", sa.String),
        sa.column("model", sa.String),
        sa.column("trim", sa.String),
        sa.column("year", sa.Integer),
        sa.column("status", sa.String),
        sa.column("stock_number", sa.String),
        sa.column("vin", sa.String),
        sa.column("price", sa.Integer),
        sa.column("mileage", sa.Integer),
        sa.column("body_type", sa.String),
        sa.column("transmission", sa.String),
        sa.column("drivetrain", sa.String),
        sa.column("engine", sa.String),
        sa.column("exterior_color", sa.String),
        sa.column("interior_color", sa.String),
        sa.column("location", sa.String),
        sa.column("short_description", sa.String),
        sa.column("description", sa.Text),
        sa.column("images", sa.JSON),
        sa.column("features", sa.JSON),
        sa.column("specs", sa.JSON),
        sa.column("details", sa.JSON),
        sa.column("featured", sa.Boolean),
        sa.column("financing_available", sa.Boolean),
        sa.column("warranty_available", sa.Boolean),
        sa.column("delivery_available", sa.Boolean),
        sa.column("created_at", sa.DateTime),
    )


def upgrade() -> None:
    table = _vehicle_table()
    rows = []
    for index, vehicle in enumerate(VEHICLES, start=1):
        slug = vehicle["slug"]
        rows.append({
            "id": str(uuid4()),
            "slug": slug,
            "title": vehicle["title"],
            "make": vehicle["make"],
            "model": vehicle["model"],
            "trim": vehicle["trim"],
            "year": vehicle["year"],
            "status": "Available",
            "stock_number": None,
            "vin": None,
            "price": vehicle["price"],
            "mileage": vehicle["mileage"],
            "body_type": vehicle["body_type"],
            "transmission": vehicle["transmission"],
            "drivetrain": vehicle["drivetrain"],
            "engine": vehicle["engine"],
            "exterior_color": vehicle["exterior_color"],
            "interior_color": vehicle["interior_color"],
            "location": "Baldwinville, MA",
            "short_description": vehicle["short_description"],
            "description": vehicle["description"],
            "images": [
                f"/media/vehicles/{slug}/{image_number:03d}.webp"
                for image_number in range(1, vehicle["images_total"] + 1)
            ],
            "features": vehicle["features"],
            "specs": vehicle["specs"],
            "details": {},
            "featured": index <= 4,
            "financing_available": False,
            "warranty_available": True,
            "delivery_available": True,
            "created_at": datetime.utcnow(),
        })
    op.bulk_insert(table, rows)


def downgrade() -> None:
    table = _vehicle_table()
    op.get_bind().execute(
        table.delete().where(table.c.slug.in_([vehicle["slug"] for vehicle in VEHICLES]))
    )
