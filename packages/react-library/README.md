# @kit-data-manager/data-view-web-component-react

React wrapper for [@kit-data-manager/data-view-web-component-react](https://github.com/kit-data-manager/data-view-web-component)

## Installation

    npm install @kit-data-manager/data-view-web-component-react

## Usage

Refer to the documentation of [@kit-data-manager/data-view-web-component](https://github.com/kit-data-manager/data-view-web-component). 

> **Important:** When using the React wrapper you have to use camelCase. Component names must be capitalized in React, see below.

### Example

```typescript jsx
import {DataCard} from "@kit-data-manager/data-view-web-component-react/dist/components";

function MyComponent() {
  return <DataCard value={"something"} emphasizeContent={false}  />
}
```