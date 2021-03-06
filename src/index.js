function cast(subject, mapping, bind = false) {
  const casted = Object.create(subject);
  for (const key in mapping) {
    const alias = mapping[key];
    const fn = !bind ? subject[alias] : (...args) => subject[alias](...args);
    casted[key] = fn;
    casted[key.slice(2).toLowerCase()] = fn;
  }
  return casted;
}

const libs = {
  rx: {
    is: $ => $.onNext && $.onError && $.onCompleted,
    cast: $ => cast($, {
      onNext: "onNext",
      onError: "onError",
      onCompleted: "onCompleted"
    }, true)
  },

  bacon: {
    is: $ => $.push && $.error && $.end,
    cast: $ => cast($, {
      onNext: "push",
      onError: "error",
      onCompleted: "end"
    }, true)
  },

  kefir: {
    is: $ => $.emit && $.error && $.end,
    cast: $ => cast($, {
      onNext: "emit",
      onError: "error",
      onCompleted: "end"
    })
  },

  most: {
    is: $ => $.next && $.error && $.complete && $.run,
    cast: $ => cast($, {
      onNext: "next",
      onError: "error",
      onCompleted: "complete"
    })
  }
};

export default function castSubject(stream) {
  for (const key in libs) {
    const lib = libs[key];
    if (lib.is(stream)) {
      return lib.cast(stream);
    }
  }

  throw new Error("[rx-cast-subject] Unknown stream type");
}
