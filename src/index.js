const map = {
  rx: {
    is: $ => $.onNext && $.onError && $.onCompleted,
    cast: $ => $
  },

  bacon: {
    is: $ => $.push && $.error && $.end && $.plug,
    cast: $ => {
      return Object.create($, {
        onNext: {
          value(x) { return this.push(x); }
        },
        onError: {
          value(x) { return this.error(x); }
        },
        onCompleted: {
          value() { return this.end(); }
        }
      });
    }
  },

  kefir: {
    is: $ => $.emit && $.error && $.end && $.plug,
    cast: $ => {
      return Object.create($, {
        onNext: {
          value(x) { return this.emit(x); }
        },
        onError: {
          value(x) { return this.error(x); }
        },
        onCompleted: {
          value() { return this.end(); }
        }
      });
    }
  },

  most: {
    is: $ => $.next && $.error && $.complete && $.run,
    cast: $ => {
      return Object.create($, {
        onNext: {
          value(x) { return this.next(x); }
        },
        onError: {
          value(x) { return this.error(x); }
        },
        onCompleted: {
          value() { return this.complete(); }
        }
      });
    }
  }
};

export default function cast(stream) {
  for (const key in map) {
    const lib = map[key];
    if (lib.is(stream)) {
      return lib.cast(stream);
    }
  }

  throw new Error("[rx-cast-subject] Unknown stream type");
}
