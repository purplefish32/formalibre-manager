<?php

namespace ServerBundle\Manager;

use ServerBundle\Manager\BaseManager;
use ServerBundle\Entity\Server;
use Doctrine\ORM\EntityManager;

class ServerManager extends BaseManager
{
    protected $em;

    public function __construct(
            EntityManager $em
    )
    {
        $this->em = $em;
    }

    /**
     * Returns an empty user instance
     *
     * @return ServerInterface
     */
    public function createServer()
    {
        return new Server();
    }

    public function loadServer($serverId) {
        return $this->getRepository()
                    ->findOneBy(array('id' => $serverId));
    }

    /**
    * Save Server entity
    *
    * @param Server $server
    */
    public function saveServer(Server $server)
    {
        $this->persistAndFlush($server);
    }

    /**
    * Remove Server entity
    *
    * @param Server $server
    */
    public function removeServer(Server $server)
    {
        $this->removeAndFlush($server);
    }

    public function getRepository()
    {
        return $this->em->getRepository('ServerBundle:Server');
    }

}
