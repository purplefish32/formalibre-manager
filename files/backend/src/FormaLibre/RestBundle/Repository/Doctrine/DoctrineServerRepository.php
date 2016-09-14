<?php

namespace FormaLibre\RestBundle\Repository\Doctrine;

use FormaLibre\RestBundle\Model\UserInterface;
use FormaLibre\RestBundle\Model\ServerInterface;
use FormaLibre\RestBundle\Repository\ServerRepositoryInterface;
use FormaLibre\RestBundle\Entity\Repository\ServerEntityRepository;
use FormaLibre\RestBundle\Repository\RepositoryInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class DoctrineServerRepository
 * @package FormaLibre\RestBundle\Repository\Doctrine
 */
class DoctrineServerRepository implements ServerRepositoryInterface, RepositoryInterface
{
    /**
     * @var CommonDoctrineRepository
     */
    private $commonRepository;
    /**
     * @var ServerEntityRepository
     */
    private $serverEntityRepository;

    /**
     * DoctrineUserRepository constructor.
     * @param   CommonDoctrineRepository    $commonRepository
     * @param   ServerEntityRepository     $serverEntityRepository
     */
    public function __construct(CommonDoctrineRepository $commonRepository, ServerEntityRepository $serverEntityRepository)
    {
        $this->commonRepository = $commonRepository;
        $this->serverEntityRepository = $serverEntityRepository;
    }

    /**
     * @param ServerInterface $server
     */
    public function refresh(ServerInterface $server)
    {
        $this->commonRepository->refresh($server);
    }

    /**
     * @param   ServerInterface    $server
     * @param   array               $arguments
     */
    public function save(ServerInterface $server, array $arguments = ['flush'=>true])
    {
        $this->commonRepository->save($server, $arguments);
    }

    /**
     * @param   ServerInterface    $server
     * @param   array               $arguments
     */
    public function delete(ServerInterface $server, array $arguments = ['flush'=>true])
    {
        $this->commonRepository->delete($server, $arguments);
    }

    /**
     * @param   $id
     * @return  mixed
     */
    public function findOneById($id)
    {
        return $this->serverEntityRepository->find($id);
    }

    /**
     * @param   $id
     * @return  mixed
     */
    public function findAll()
    {
        $servers = $this->serverEntityRepository->findAll();
        return new ArrayCollection($servers);
    }
}
