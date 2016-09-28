<?php

namespace FormaLibre\RestBundle\Repository\Doctrine;

use FormaLibre\RestBundle\Model\PlatformInterface;
use FormaLibre\RestBundle\Repository\PlatformRepositoryInterface;
use FormaLibre\RestBundle\Entity\Repository\PlatformEntityRepository;
use FormaLibre\RestBundle\Repository\RepositoryInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class DoctrinePlatformRepository.
 */
class DoctrinePlatformRepository implements PlatformRepositoryInterface, RepositoryInterface
{
    /**
     * @var CommonDoctrineRepository
     */
    private $commonRepository;
    /**
     * @var PlatformEntityRepository
     */
    private $platformEntityRepository;

    /**
     * DoctrineUserRepository constructor.
     *
     * @param CommonDoctrineRepository $commonRepository
     * @param PlatformEntityRepository $platformEntityRepository
     */
    public function __construct(CommonDoctrineRepository $commonRepository, PlatformEntityRepository $platformEntityRepository)
    {
        $this->commonRepository = $commonRepository;
        $this->platformEntityRepository = $platformEntityRepository;
    }

    /**
     * @param PlatformInterface $platform
     */
    public function refresh(PlatformInterface $platform)
    {
        $this->commonRepository->refresh($platform);
    }

    /**
     * @param PlatformInterface $platform
     * @param array             $arguments
     */
    public function save(PlatformInterface $platform, array $arguments = ['flush' => true])
    {
        $this->commonRepository->save($platform, $arguments);
    }

    /**
     * @param PlatformInterface $platform
     * @param array             $arguments
     */
    public function delete(PlatformInterface $platform, array $arguments = ['flush' => true])
    {
        $this->commonRepository->delete($platform, $arguments);
    }

    /**
     * @param   $id
     *
     * @return mixed
     */
    public function findOneById($id)
    {
        return $this->platformEntityRepository->find($id);
    }

    /**
     * @param   $id
     *
     * @return mixed
     */
    public function findAll()
    {
        $platforms = $this->platformEntityRepository->findAll();

        return new ArrayCollection($platforms);
    }
}
