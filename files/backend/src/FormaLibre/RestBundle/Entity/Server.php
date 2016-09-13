<?php

namespace FormaLibre\RestBundle\Entity;

use FormaLibre\RestBundle\Model\ServerInterface;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * Server
 * @ORM\Entity()
 * @ORM\Table(name="server")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Server implements ServerInterface, \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="ip", type="string", length=16, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $ip;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="provider", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $provider;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255, nullable=false)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $description;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set ip
     *
     * @param string $ip
     *
     * @return Server
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return string
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Server
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set provider
     *
     * @param string $provider
     *
     * @return Server
     */
    public function setProvider($provider)
    {
        $this->provider = $provider;

        return $this;
    }

    /**
     * Get provider
     *
     * @return string
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Server
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Server
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return mixed
     */
    function jsonSerialize()
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'proider'     => $this->proider,
            'type'        => $this->type,
            'description' => $this->description,
        ];
    }
}
