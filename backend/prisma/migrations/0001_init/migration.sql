-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'ARES-VII',
    "destination" TEXT NOT NULL DEFAULT 'Marte (Cratera Jezero)',
    "launchDate" TIMESTAMP(3) NOT NULL DEFAULT '2035-03-15T00:00:00Z',
    "estimatedDuration" INTEGER NOT NULL DEFAULT 687,
    "currentDay" INTEGER NOT NULL DEFAULT 142,
    "currentPhase" TEXT NOT NULL DEFAULT 'Cruzeiro Interplanetário',
    "distanceToEarth" DOUBLE PRECISION NOT NULL DEFAULT 78.3,
    "distanceToMars" DOUBLE PRECISION NOT NULL DEFAULT 143.7,
    "currentSpeed" DOUBLE PRECISION NOT NULL DEFAULT 24800,
    "commDelay" DOUBLE PRECISION NOT NULL DEFAULT 261,
    "totalDistance" DOUBLE PRECISION NOT NULL DEFAULT 222.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipSystem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'normal',
    "level" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "observation" TEXT,
    "icon" TEXT,
    "missionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ShipSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "healthStatus" TEXT NOT NULL DEFAULT 'good',
    "sleepHours" DOUBLE PRECISION NOT NULL,
    "currentTask" TEXT NOT NULL,
    "avatarColor" TEXT NOT NULL DEFAULT '#4A9DFF',
    "missionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendedAction" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedAction" TEXT,
    "missionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyLog" (
    "id" SERIAL NOT NULL,
    "missionDay" INTEGER NOT NULL,
    "energyGenerated" DOUBLE PRECISION NOT NULL,
    "energyConsumed" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "missionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnergyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceWeather" (
    "id" SERIAL NOT NULL,
    "cosmicRadiation" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "solarActivity" TEXT NOT NULL DEFAULT 'Moderada',
    "micrometeoriteProb" DOUBLE PRECISION NOT NULL DEFAULT 0.003,
    "exteriorTemp" DOUBLE PRECISION NOT NULL DEFAULT -270.4,
    "solarWind" DOUBLE PRECISION NOT NULL DEFAULT 485,
    "radiationTrend" TEXT NOT NULL DEFAULT 'rising',
    "solarActivityTrend" TEXT NOT NULL DEFAULT 'rising',
    "meteoriteTrend" TEXT NOT NULL DEFAULT 'stable',
    "tempTrend" TEXT NOT NULL DEFAULT 'stable',
    "solarWindTrend" TEXT NOT NULL DEFAULT 'rising',
    "missionId" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SpaceWeather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionLogEntry" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "missionId" INTEGER NOT NULL,
    CONSTRAINT "MissionLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alert_code_key" ON "Alert"("code");

-- AddForeignKey
ALTER TABLE "ShipSystem" ADD CONSTRAINT "ShipSystem_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyLog" ADD CONSTRAINT "EnergyLog_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceWeather" ADD CONSTRAINT "SpaceWeather_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionLogEntry" ADD CONSTRAINT "MissionLogEntry_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
