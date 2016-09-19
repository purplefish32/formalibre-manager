<?php

namespace FormaLibre\RestBundle\DataTransformer;

use FormaLibre\RestBundle\DTO\PlatformDTO;
use FormaLibre\RestBundle\Model\PlatformInterface;

class PlatformDataTransformer
{
    public function convertToDTO(PlatformInterface $platform)
    {
      $dto = new PlatformDTO();

      $dto->setName($platform->getName());
      $dto->setSubdomain($platform->getSubdomain());
      $dto->setPlan($platform->getPlan());
      $dto->setEndDate($platform->getEndDate());
      $dto->setDescription($platform->getDescription());
      $dto->setMaxUsers($platform->getMaxUsers());
      $dto->setMaxDiskSpace($platform->getMaxDiskSpace());
      $dto->setContactName($platform->getContactName());
      $dto->setContactEmail($platform->getContactEmail());
      $dto->setContactPhone($platform->getContactPhone());

      return $dto;
    }

    public function updateFromDTO(PlatformInterface $platform, PlatformDTO $dto)
    {
      if ($platform->getName() !== $dto->getName()) {
          $platform->setName($dto->getName());
      }

      if ($platform->getSubdomain() !== $dto->getSubdomain()) {
          $platform->setSubdomain($dto->getSubdomain());
      }

      if ($platform->getPlan() !== $dto->getPlan()) {
          $platform->setPlan($dto->getPlan());
      }

      if ($platform->getEndDate() !== $dto->getEndDate()) {
          $platform->setEndDate($dto->getEndDate());
      }

      if ($platform->getDescription() !== $dto->getDescription()) {
          $platform->setDescription($dto->getDescription());
      }

      if ($platform->getMaxUsers() !== $dto->getMaxUsers()) {
          $platform->setMaxUsers($dto->getMaxUsers());
      }

      if ($platform->getMaxDiskSpace() !== $dto->getMaxDiskSpace()) {
          $platform->setMaxDiskSpace($dto->getMaxDiskSpace());
      }

      if ($platform->getContactName() !== $dto->getContactName()) {
          $platform->setContactName($dto->getContactName());
      }

      if ($platform->getContactEmail() !== $dto->getContactEmail()) {
          $platform->setContactEmail($dto->getContactEmail());
      }

      if ($platform->getContactPhone() !== $dto->getContactPhone()) {
          $platform->setContactPhone($dto->getContactPhone());
      }



      return $platform;
    }
}
