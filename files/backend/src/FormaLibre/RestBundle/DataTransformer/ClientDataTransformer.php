<?php

namespace FormaLibre\RestBundle\DataTransformer;

use FormaLibre\RestBundle\DTO\ClientDTO;
use FormaLibre\RestBundle\Model\ClientInterface;

class ClientDataTransformer
{
    public function convertToDTO(ClientInterface $client)
    {
        $dto = new ClientDTO();

        $dto->setFirstname($client->getFirstname());
        $dto->setLastname($client->getLastname());
        $dto->setOrganisation($client->getOrganisation());
        $dto->setEmail($client->getEmail());
        $dto->setPhone($client->getPhone());
        $dto->setAddress($client->getAddress());

        return $dto;
    }

    public function updateFromDTO(ClientInterface $client, ClientDTO $dto)
    {
        if ($client->getFirstname() !== $dto->getFirstname()) {
            $client->setFirstname($dto->getFirstname());
        }

        if ($client->getLastname() !== $dto->getLastname()) {
            $client->setLastname($dto->getLastname());
        }

        if ($client->getOrganisation() !== $dto->getOrganisation()) {
            $client->setOrganisation($dto->getOrganisation());
        }

        if ($client->getEmail() !== $dto->getEmail()) {
            $client->setEmail($dto->getEmail());
        }

        if ($client->getPhone() !== $dto->getPhone()) {
            $client->setPhone($dto->getPhone());
        }

        if ($client->getAddress() !== $dto->getAddress()) {
            $client->setAddress($dto->getAddress());
        }

        return $client;
    }
}
