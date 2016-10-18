<?php

namespace FormaLibre\RestBundle\Factory;

use FormaLibre\RestBundle\DTO\ClientDTO;
use FormaLibre\RestBundle\Entity\Client;

class ClientFactory //implements ClientFactoryInterface
{
    /**
     * @param string $firstname
     * @param string $lastname
     * @param string $organisation
     * @param string $email
     * @param string $phone
     * @param string $address
     *
     * @return Client
     */
    public function create($firstname = null, $lastname = null, $organisation = null, $email = null, $phone = null, $address = null)
    {
        return new Client($firstname, $lastname, $organisation, $email, $phone, $address);
    }

    /**
     * @param ClientDTO $clientDTO
     *
     * @return Client
     */
    public function createFromDTO(ClientDTO $clientDTO)
    {
        $client = self::create(
            $clientDTO->getFirstname(),
            $clientDTO->getLastname(),
            $clientDTO->getOrganisation(),
            $clientDTO->getEmail(),
            $clientDTO->getPhone(),
            $clientDTO->getAddress()

        );

        return $client;
    }
}
