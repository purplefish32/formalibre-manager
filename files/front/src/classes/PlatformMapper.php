<?php

class PlatformMapper extends Mapper
{
    public function getPlatforms() {
          $sql = "SELECT p.id, p.name, p.subdomain, p.plan
              from platform p";
          $stmt = $this->db->query($sql);
          $results = [];
          while($row = $stmt->fetch()) {
              $results[] = new PlatformEntity($row);
          }
          return $results;
    }

    public function save(PlatformEntity $platform) {
        $sql = "insert into platform
            (name, subdomain, plan) values
            (:name, :subdomain, :plan)";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            "name" => $platform->getName(),
            "subdomain" => $platform->getSubdomain(),
            "plan" => $platform->getPlan(),
        ]);
        if(!$result) {
            throw new Exception("could not save record");
        }
    }
}
