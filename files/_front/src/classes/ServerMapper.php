<?php

class ServerMapper extends Mapper
{
    public function getServers() {
          $sql = "SELECT s.id, s.ip, s.name, s.description, s.type
              from server s";
          $stmt = $this->db->query($sql);
          $results = [];
          while($row = $stmt->fetch()) {
              $results[] = new Server($row);
          }
          return $results;
    }
}
