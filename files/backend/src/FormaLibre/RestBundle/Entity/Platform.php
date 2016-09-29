<?php

namespace FormaLibre\RestBundle\Entity;

use FormaLibre\RestBundle\Model\PlatformInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * Platform.
 *
 * @ORM\Entity(repositoryClass="FormaLibre\RestBundle\Entity\Repository\PlatformEntityRepository")
 * @ORM\Table(name="platform")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Platform implements PlatformInterface, \JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="subdomain", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $subdomain;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="plan", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $plan;

    /**
     * @var string
     *
     * @ORM\Column(name="endDate", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $endDate;

    /**
     * @var string
     *
     * @ORM\Column(name="maxUsers", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $maxUsers;

    /**
     * @var string
     *
     * @ORM\Column(name="maxDiskSpace", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $maxDiskSpace;

    /**
     * @var string
     *
     * @ORM\Column(name="contactName", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $contactName;

    /**
     * @var string
     *
     * @ORM\Column(name="contactEmail", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $contactEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="contactPhone", type="string", length=255)
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     */
    private $contactPhone;

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
     * Set name.
     *
     * @param string $name
     *
     * @return Platform
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set subdomain.
     *
     * @param string $subdomain
     *
     * @return Platform
     */
    public function setSubdomain($subdomain)
    {
        $this->subdomain = $subdomain;

        return $this;
    }

    /**
     * Get subdomain.
     *
     * @return string
     */
    public function getSubdomain()
    {
        return $this->subdomain;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Platform
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set plan.
     *
     * @param string $plan
     *
     * @return Platform
     */
    public function setPlan($plan)
    {
        $this->plan = $plan;

        return $this;
    }

    /**
     * Get plan.
     *
     * @return string
     */
    public function getPlan()
    {
        return $this->plan;
    }

    /**
     * Set endDate.
     *
     * @param string $endDate
     *
     * @return Platform
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * Get endDate.
     *
     * @return string
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set maxUsers.
     *
     * @param string $maxUsers
     *
     * @return Platform
     */
    public function setMaxUsers($maxUsers)
    {
        $this->maxUsers = $maxUsers;

        return $this;
    }

    /**
     * Get maxUsers.
     *
     * @return string
     */
    public function getMaxUsers()
    {
        return $this->maxUsers;
    }

    /**
     * Set maxDiskSpace.
     *
     * @param string $maxDiskSpace
     *
     * @return Platform
     */
    public function setMaxDiskSpace($maxDiskSpace)
    {
        $this->maxDiskSpace = $maxDiskSpace;

        return $this;
    }

    /**
     * Get maxDiskSpace.
     *
     * @return string
     */
    public function getMaxDiskSpace()
    {
        return $this->maxDiskSpace;
    }

    /**
     * Set contactName.
     *
     * @param string $contactName
     *
     * @return Platform
     */
    public function setContactName($contactName)
    {
        $this->contactName = $contactName;

        return $this;
    }

    /**
     * Get contactName.
     *
     * @return string
     */
    public function getContactName()
    {
        return $this->contactName;
    }

    /**
     * Set contactEmail.
     *
     * @param string $contactEmail
     *
     * @return Platform
     */
    public function setContactEmail($contactEmail)
    {
        $this->contactEmail = $contactEmail;

        return $this;
    }

    /**
     * Get contactEmail.
     *
     * @return string
     */
    public function getContactEmail()
    {
        return $this->contactEmail;
    }

    /**
     * Set contactPhone.
     *
     * @param string $contactPhone
     *
     * @return Platform
     */
    public function setContactPhone($contactPhone)
    {
        $this->contactPhone = $contactPhone;

        return $this;
    }

    /**
     * Get contactPhone.
     *
     * @return string
     */
    public function getContactPhone()
    {
        return $this->contactPhone;
    }

    /**
     * @return mixed
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'subdomain' => $this->subdomain,
            'description' => $this->description,
            'plan' => $this->plan,
            'endDate' => $this->endDate,
            'maxUsers' => $this->maxUsers,
            'maxDiskSpace' => $this->maxDiskSpace,
            'contactName' => $this->contactName,
            'contactEmail' => $this->contactEmail,
            'contactPhone' => $this->contactPhone,
        ];
    }
}
