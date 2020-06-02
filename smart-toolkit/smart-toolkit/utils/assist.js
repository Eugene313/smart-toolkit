export function findComponentsDownward (context, componentName, ignoreComponentNames = []) {
  if (!Array.isArray(ignoreComponentNames)) {
    ignoreComponentNames = [ignoreComponentNames]
  }
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) { components.push(child) }
    if (!ignoreComponentNames.includes(child.$options.name)) {
      const foundChilds = findComponentsDownward(child, componentName)
      return components.concat(foundChilds)
    } else {
      return components
    }
  }, [])
}
export function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || !componentNames.includes(name))) {
    parent = parent.$parent
    if (parent) { name = parent.$options.name }
  }
  return parent
}
