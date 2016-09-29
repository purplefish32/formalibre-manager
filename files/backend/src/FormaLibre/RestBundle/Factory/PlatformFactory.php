<?php

namespace FormaLibre\RestBundle\Factory;

use FormaLibre\RestBundle\DTO\PlatformDTO;
use FormaLibre\RestBundle\Entity\Platform;

class PlatformFactory //implements PlatformFactoryInterface
{
    /**
     * @param string $plan
     *
     * @return Platform
     */
    public function create($name = null, $subdomain = null, $description = null, $plan = null, $endDate = null, $maxUsers = null, $maxDiskSpace = null, $contactName = null, $contactEmail = null, $contactPhone = null)
    {
        return new Platform($name, $subdomain, $description, $plan, $endDate, $maxUsers, $maxDiskSpace, $contactName, $contactEmail, $contactPhone);
    }

    /**
     * @param PlatformDTO $platformDTO
     *
     * @return Platform
     */
    public function createFromDTO(PlatformDTO $platformDTO)
    {
        $platform = self::create(
            $platformDTO->getName(),
            $platformDTO->getSubdomain(),
            $platformDTO->getDescription(),
            $platformDTO->getPlan(),
            $platformDTO->getEndDate(),
            $platformDTO->getMaxUsers(),
            $platformDTO->getMaxDiskSpace(),
            $platformDTO->getContactName(),
            $platformDTO->getContactEmail(),
            $platformDTO->getContactPhone()
        );

        return $platform;
    }
}
