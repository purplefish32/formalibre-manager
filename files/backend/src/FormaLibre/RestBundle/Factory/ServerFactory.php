<?php

namespace FormaLibre\RestBundle\Factory;

use FormaLibre\RestBundle\DTO\ServerDTO;
use FormaLibre\RestBundle\Entity\Server;

class ServerFactory
{
    /**
     * @param  string       $serverName
     * @return Server
     */
    public function create()
    {
        return new Server();
    }

    /**
     * @param  ServerDTO   $serverDTO
     * @return Server
     */
    public function createFromDTO(ServerDTO $serverDTO)
    {
        $server = self::create();

        return $server;
    }
}
