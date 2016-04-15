# rx-cast-subject
Unify next/error/end interface of subjects from different FRP libs.
 
---

### Installation
```
npm install --save rx-cast-subject
```

---

### API
#### `cast : Subject -> RxSubject`
#### `Subject : new Rx.Subject | new Bacon.Bus | new KefirBus | mostSubject().subject`

`cast(subject)` ensures that given subject has `onNext`, `onError` and `onCompleted` methods, as standard RxJS subject.

Additionally, it ensures all that methods are bound to subject context, so you can safely do `<div onClick={subject.onNext} />`.
`kefir` and `most` do this themselves, `rx` and `bacon` are not.

Just like [bacon-cast](https://github.com/StreakYC/bacon-cast) or [kefir-cast](https://github.com/StreakYC/kefir-cast), this is intended for use by libraries which want to be able to accept streams from different sources, without diving into differences between them.
