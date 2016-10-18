<?php

namespace FormaLibre\RestBundle\Manager;

use FormaLibre\RestBundle\DataTransformer\ClientDataTransformer;
use FormaLibre\RestBundle\DTO\ClientDTO;
use FormaLibre\RestBundle\Form\Handler\FormHandler;
use FormaLibre\RestBundle\Model\ClientInterface;
use FormaLibre\RestBundle\Repository\ClientRepositoryInterface;
use FormaLibre\RestBundle\Factory\ClientFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ClientManager implements ManagerInterface
{
    /**
     * @var FormHandlerInterface
     */
    private $formHandler;

    /**
     * @var ClientDataTransformer
     */
    private $dataTransformer;

    public function __construct(
        FormHandler $formHandler,
        ClientDataTransformer $dataTransformer,
        ClientFactory $clientFactory,
        ClientRepositoryInterface $clientRepository
    ) {
        $this->formHandler = $formHandler;
        $this->dataTransformer = $dataTransformer;
        $this->factory = $clientFactory;
        $this->repository = $clientRepository;
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public function get($id)
    {
        if ($id === null) {
            throw new BadRequestHttpException('A client ID was not specified.');
        }

        return $this->repository->findOneById($id);
    }

    /**
     * @param $limit
     * @param $offset
     *
     * @return array
     */
    public function all($limit = 50, $offset = 0)
    {
        return $this->repository->findAll()->slice($offset, $limit);
    }

    /**
     * @param array $parameters
     *
     * @return mixed
     */
    public function post(array $parameters, array $options = [])
    {
        $clientDTO = $this->formHandler->handle(
            new ClientDTO(),
            $parameters,
            Request::METHOD_POST,
            $options
        );
        $client = $this->factory->createFromDTO($clientDTO);

        $this->repository->save($client);

        return $client;
    }

    /**
     * @param ClientInterface $client
     * @param array           $parameters
     * @param array           $options
     *
     * @return mixed
     */
    public function put($client, array $parameters, array $options = [])
    {
        $this->guardClientImplementsInterface($client);

        /** @var ClientInterface $client */
        $clientDTO = $this->dataTransformer->convertToDTO($client);
        $clientDTO = $this->formHandler->handle(
            $clientDTO,
            $parameters,
            Request::METHOD_PUT,
            $options
        );
        $this->repository->refresh($client);
        $client = $this->dataTransformer->updateFromDTO($client, $clientDTO);
        $this->repository->save($client);

        return $client;
    }

    /**
     * @param ClientInterface $clientInterface
     *
     * @return mixed
     */
    public function delete($resource)
    {
        $this->guardClientImplementsInterface($resource);

        return $this->repository->delete($resource);
    }

   /**
    * @param $client
    */
   private function guardClientImplementsInterface($client)
   {
       if (!$client instanceof ClientInterface) {
           throw new \InvalidArgumentException('Expected passed Client to implement ClientInterface');
       }
   }
}
