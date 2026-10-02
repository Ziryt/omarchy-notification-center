.pragma library

// A second way for Panel.qml to find the Service.qml singleton, next to
// `bar.shell.serviceFor()`.
//
// That lookup only resolves under the stock omarchy bar: Bar.qml hands a
// bar-widget's own `.shell` a service-capable facade only when the bar
// hosting it is the trusted, first-party one (see its `registered` check).
// A third-party replacement bar gets the narrower "bar entry" facade
// instead, which has no serviceFor at all -- by design, so an untrusted bar
// cannot reach into a plugin it merely hosts. That design is correct for
// hosting SOMEONE ELSE's service, but it also blocks a plugin from reaching
// its OWN paired service when it is the one being hosted, with nothing
// hostile about the request.
//
// `.pragma library` gives every QML file that imports this one the same
// module instance, so it survives independently of whichever `bar.shell`
// happened to get injected. Service.qml registers itself here once, at
// startup, and Panel.qml's existing retry loop (already polling for
// `bar.shell.serviceFor()` to resolve) reads it back as a fallback.
var instance = null

function register(service) {
  instance = service
}

function get() {
  return instance
}
