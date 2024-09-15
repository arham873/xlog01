-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "storage" VARCHAR(10) NOT NULL,
    "id_edc" VARCHAR(50) NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "customer_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeAsset" (
    "id" SERIAL NOT NULL,
    "asset_type" VARCHAR(100) NOT NULL,

    CONSTRAINT "TypeAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Main" (
    "id" SERIAL NOT NULL,
    "storage_id" INTEGER,
    "id_edc" VARCHAR(50),
    "asset" VARCHAR(100),
    "type_asset_id" INTEGER,
    "serial_number" VARCHAR(100),
    "customer_id" INTEGER,
    "status_asset" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Main_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "storage_id" INTEGER,
    "id_edc" VARCHAR(50),
    "asset" VARCHAR(100),
    "type_asset_id" INTEGER,
    "serial_number" VARCHAR(100),
    "customer_id" INTEGER,
    "status_asset" VARCHAR(20),
    "admin_id" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Main_serial_number_key" ON "Main"("serial_number");

-- AddForeignKey
ALTER TABLE "Main" ADD CONSTRAINT "Main_storage_id_fkey" FOREIGN KEY ("storage_id") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Main" ADD CONSTRAINT "Main_type_asset_id_fkey" FOREIGN KEY ("type_asset_id") REFERENCES "TypeAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Main" ADD CONSTRAINT "Main_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_storage_id_fkey" FOREIGN KEY ("storage_id") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_type_asset_id_fkey" FOREIGN KEY ("type_asset_id") REFERENCES "TypeAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
