const DataTypes = {
  String: "A1",
  Number: "A2",
  Boolean: "A3",
  Object: "A4",
};

function getPrefix(input) {
  return typeof input === "string" && input.length > 2 ? input.slice(0, 2) : "";
}

function hex(input) {
  return input
    .split("")
    .map((character) => {
      return character.charCodeAt(0).toString(16).padStart(2, "0");
    })
    .join("")
    .toUpperCase();
}

function unhex(input) {
  return input
    .match(/[0-9A-F]{2}/g)
    .map((codeStr) => String.fromCharCode(parseInt(codeStr, 16)))
    .join("");
}

function prefix(dataType, input) {
  return `${dataType}${hex(input)}`;
}

function unprefix(input) {
  return input.slice(2);
}

function toString(input) {
  return prefix(DataTypes.String, input);
}

function toNumber(input) {
  return prefix(DataTypes.Number, input.toString());
}

function toBoolean(input) {
  return prefix(DataTypes.Boolean, input ? "1" : "0");
}

function toObject(input) {
  const objStr = JSON.stringify(input);
  return prefix(DataTypes.Object, objStr);
}

function isString(input) {
  return getPrefix(input) === DataTypes.String;
}

function isNumber(input) {
  return getPrefix(input) === DataTypes.Number;
}

function isBoolean(input) {
  return getPrefix(input) === DataTypes.Boolean;
}

function isObject(input) {
  return getPrefix(input) === DataTypes.Object;
}

const api = {
  encode(input) {
    if (input === null || input === undefined) {
      return "";
    }
    if (typeof input === "string") {
      return toString(input);
    } else if (typeof input === "number") {
      return toNumber(input);
    } else if (typeof input === "boolean") {
      return toBoolean(input);
    } else if (typeof input === "object") {
      return toObject(input);
    }
    return "";
  },

  decode(input) {
    if (isString(input)) {
      return unhex(unprefix(input));
    } else if (isNumber(input)) {
      return Number(unhex(unprefix(input)));
    } else if (isBoolean(input)) {
      return unhex(unprefix(input)) === "1";
    } else if (isObject(input)) {
      return JSON.parse(unhex(unprefix(input)));
    }

    return null;
  },
};

module.exports = api;
