module.exports = {
  "package": {
    "id": "/type/package",
    "type": "object",
    "required": [ "id" ],
    "properties": {
      "id": { "$ref": "/type/packageName" },
      "version": { "$ref": "/type/versionCode" },
    }
  },
  "packageWithVersion": {
    "id": "/type/packageWithVersion",
    "type": "object",
    "required": [ "id", "version" ],
    "properties": {
      "id": { "$ref": "/type/packageName" },
      "version": { "$ref": "/type/versionCode" },
    }
  },
  "packageName": {
    "id": "/type/packageName",
    "type": "string"
  },
  "versionCode": {
    "id": "/type/versionCode",
    "type": "integer"
  }
};

