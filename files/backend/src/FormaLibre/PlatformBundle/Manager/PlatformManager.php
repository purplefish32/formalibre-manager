<?php

namespace PlatformBundle\Manager;

use PlatformBundle\Entity\Platform;
use Doctrine\ORM\EntityManager;

class PlatformManager extends BaseManager
{
    protected $em;

    public function __construct(
            EntityManager $em
    ) {
        $this->em = $em;
    }

    /**
     * Returns an empty platform instance.
     *
     * @return PlatformInterface
     */
    public function createPlatform()
    {
        return new Platform();
    }

    public function loadPlatform($platformId)
    {
        return $this->getRepository()
                    ->findOneBy(array('id' => $platformId));
    }

    /**
     * Save Platform entity.
     *
     * @param Platform $platform
     */
    public function savePlatform(Platform $platform)
    {
        $this->persistAndFlush($platform);
    }

    /**
     * Remove Platform entity.
     *
     * @param Platform $platform
     */
    public function removePlatform(Platform $platform)
    {
        $this->removeAndFlush($platform);
    }

    public function getRepository()
    {
        return $this->em->getRepository('PlatformBundle:Platform');
    }
}
