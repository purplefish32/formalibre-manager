<?php

namespace FormaLibre\RestBundle\Factory;

use FormaLibre\RestBundle\DTO\ServerDTO;
use FormaLibre\RestBundle\Entity\Server;

class ServerFactory //implements ServerFactoryInterface
{
    /**
     * @param  string       $ip
     * @return Server
     */
    public function create($ip = null, $name = null, $type = null, $provider = null, $description = null)
    {
        return new Server($ip, $name, $type, $provider, $description);
    }

    /**
     * @param  ServerDTO   $serverDTO
     * @return Server
     */
    public function createFromDTO(ServerDTO $serverDTO)
    {
        $server = self::create(
            $serverDTO->getIp(),
            $serverDTO->getName(),
            $serverDTO->getType(),
            $serverDTO->getProvider(),
            $serverDTO->getDescription()

        );

        return $server;
    }
}
