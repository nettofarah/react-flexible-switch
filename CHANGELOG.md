# Changelog

## 0.5.0 (Nov 26, 2016)
### Added
- Make Switch a controlled component

### Breaking Changes
- Remove `active` and `inactive` in favor of using `value` as the controlling property
- Remove `onActive` and `onInactive` in favor of using `onChange`

## 0.4.1 (Sep 24, 2016)
### Added
- Support for React 15 (peer dependency)

## 0.3.1 (Jun 30, 2016)

### Bug Fixes
- Reset global events when `locked` props are changed
- Only enable touch events when necessary
