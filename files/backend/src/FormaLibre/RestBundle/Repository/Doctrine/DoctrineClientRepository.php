<?php

namespace FormaLibre\RestBundle\Repository\Doctrine;

use FormaLibre\RestBundle\Model\ClientInterface;
use FormaLibre\RestBundle\Repository\ClientRepositoryInterface;
use FormaLibre\RestBundle\Entity\Repository\ClientEntityRepository;
use FormaLibre\RestBundle\Repository\RepositoryInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class DoctrineClientRepository.
 */
class DoctrineClientRepository implements ClientRepositoryInterface, RepositoryInterface
{
    /**
     * @var CommonDoctrineRepository
     */
    private $commonRepository;
    /**
     * @var ClientEntityRepository
     */
    private $clientEntityRepository;

    /**
     * DoctrineUserRepository constructor.
     *
     * @param CommonDoctrineRepository $commonRepository
     * @param ClientEntityRepository   $clientEntityRepository
     */
    public function __construct(CommonDoctrineRepository $commonRepository, ClientEntityRepository $clientEntityRepository)
    {
        $this->commonRepository = $commonRepository;
        $this->clientEntityRepository = $clientEntityRepository;
    }

    /**
     * @param ClientInterface $client
     */
    public function refresh(ClientInterface $client)
    {
        $this->commonRepository->refresh($client);
    }

    /**
     * @param ClientInterface $client
     * @param array           $arguments
     */
    public function save(ClientInterface $client, array $arguments = ['flush' => true])
    {
        $this->commonRepository->save($client, $arguments);
    }

    /**
     * @param ClientInterface $client
     * @param array           $arguments
     */
    public function delete(ClientInterface $client, array $arguments = ['flush' => true])
    {
        $this->commonRepository->delete($client, $arguments);
    }

    /**
     * @param   $id
     *
     * @return mixed
     */
    public function findOneById($id)
    {
        return $this->clientEntityRepository->find($id);
    }

    /**
     * @param   $id
     *
     * @return mixed
     */
    public function findAll()
    {
        $clients = $this->clientEntityRepository->findAll();

        return new ArrayCollection($clients);
    }
}
