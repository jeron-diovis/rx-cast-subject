import cast from "../src";

import KefirBus from "kefir-bus";
import Rx from "rx";
import Bacon from "baconjs";
import { subject as MostSubject } from "most-subject";
import most from "most";


describe("rx", () => {

  let origin, casted;

  beforeEach(() => {
    origin = new Rx.Subject;
    casted = cast(origin);
  });

  afterEach(() => {
    origin = null;
    casted = null;
  });

  it("values", () => {
    const listener = sinon.spy();
    origin.subscribe(listener);
    casted.onNext();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("errors", () => {
    const listener = sinon.spy();
    origin.subscribe(undefined, listener);
    casted.onError();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("end", () => {
    const listener = sinon.spy();
    origin.subscribe(undefined, undefined, listener);
    casted.onCompleted();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });
});



describe("bacon", () => {

  let origin, casted;

  beforeEach(() => {
    origin = new Bacon.Bus;
    casted = cast(origin);
  });

  afterEach(() => {
    origin = null;
    casted = null;
  });

  it("values", () => {
    const listener = sinon.spy();
    origin.onValue(listener);
    casted.onNext();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("errors", () => {
    const listener = sinon.spy();
    origin.onError(listener);
    casted.onError();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("end", () => {
    const listener = sinon.spy();
    origin.onEnd(listener);
    casted.onCompleted();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });
});


describe("kefir", () => {

  let origin, casted;

  beforeEach(() => {
    origin = new KefirBus;
    casted = cast(origin);
  });

  afterEach(() => {
    origin = null;
    casted = null;
  });

  it("values", () => {
    const listener = sinon.spy();
    origin.onValue(listener);
    casted.onNext();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("errors", () => {
    const listener = sinon.spy();
    origin.onError(listener);
    casted.onError();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("end", () => {
    const listener = sinon.spy();
    origin.onEnd(listener);
    casted.onCompleted();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });
});


describe("most", () => {

  let origin, casted;

  beforeEach(() => {
    const { observer, stream } = MostSubject();
    origin = stream;
    casted = cast(observer);
  });

  afterEach(() => {
    origin = null;
    casted = null;
  });

  it("values", () => {
    const listener = sinon.spy();
    origin.observe(listener);
    casted.onNext();
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("errors", () => {
    const listener = sinon.spy(() => most.of(42));
    origin.recoverWith(listener).drain();
    casted.onError(42);
    assert.equal(listener.callCount, 1, "subscription does not work");
  });

  it("end", () => {
    // Nothing to do here. There is no `end` event in most.
  });
});


// ---


it("unknown", () => {
  const stream = {};

  assert.throws(
    () => cast(stream),
    /Unknown stream type/
  );
});