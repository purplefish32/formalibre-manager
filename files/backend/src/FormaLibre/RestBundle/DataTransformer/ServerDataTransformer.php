<?php

namespace FormaLibre\RestBundle\DataTransformer;

use FormaLibre\RestBundle\DTO\ServerDTO;
use FormaLibre\RestBundle\Model\ServerInterface;

class ServerDataTransformer
{
    public function convertToDTO(ServerInterface $server)
    {
        $dto = new ServerDTO();

        $dto->setName($server->getName());
        $dto->setIp($server->getIp());
        $dto->setProvider($server->getProvider());
        $dto->setType($server->getType());
        $dto->setDescription($server->getDescription());

        return $dto;
    }

    public function updateFromDTO(ServerInterface $server, ServerDTO $dto)
    {
        if ($server->getName() !== $dto->getName()) {
            $server->setName($dto->getName());
        }

        if ($server->getIp() !== $dto->getIp()) {
            $server->setIp($dto->getIp());
        }

        if ($server->getProvider() !== $dto->getProvider()) {
            $server->setProvider($dto->getProvider());
        }

        if ($server->getType() !== $dto->getType()) {
            $server->setType($dto->getType());
        }

        if ($server->getDescription() !== $dto->getDescription()) {
            $server->setDescription($dto->getDescription());
        }

        return $server;
    }
}
