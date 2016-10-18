<?php

namespace FormaLibre\RestBundle\Entity;

use FormaLibre\RestBundle\Model\ClientInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * Client.
 *
 * @ORM\Entity(repositoryClass="FormaLibre\RestBundle\Entity\Repository\ClientEntityRepository")
 * @ORM\Table(name="client")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Client implements ClientInterface, \JsonSerializable
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
     * @ORM\Column(name="firstname", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $lastname;

    /**
     * @var string
     *
     * @ORM\Column(name="organisation", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $organisation;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="address", type="string", length=255, nullable=true)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $address;

    public function __construct($firstname = null, $lastname = null, $organisation = null, $email = null, $phone = null, $address = null)
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->organisation = $organisation;
        $this->email = $email;
        $this->phone = $phone;
        $this->address = $address;
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
    * Set firstname.
    *
    * @param string $firstname
    *
    * @return Client
    */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
    * Get firstname.
    *
    * @return string
    */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname.
     *
     * @param string $lastname
     *
     * @return Client
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname.
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }


    /**
     * Set organisation.
     *
     * @param string $organisation
     *
     * @return Client
     */
    public function setOrganisation($organisation)
    {
        $this->organisation = $organisation;

        return $this;
    }

    /**
     * Get organisation.
     *
     * @return string
     */
    public function getOrganisation()
    {
        return $this->organisation;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Client
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set phone.
     *
     * @param string $phone
     *
     * @return Client
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set address.
     *
     * @param string $address
     *
     * @return Client
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address.
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @return mixed
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'organisation' => $this->organisation,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
        ];
    }
}
