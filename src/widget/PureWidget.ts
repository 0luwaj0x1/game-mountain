/**
 * A PureWidget is an abstraction layer for components that wrap other components and / or DOM elements.
 *
 * In the constructor, the PureWidget should create all necessary DOM nodes and child PureWidgets.
 *
 * The PureWidget uses the concept of `State`, and `Props`.
 * - `State` can be updated internally by the component using `setState`
 * - `Props` are passed in when a parent-component calls the PureWidget `renderWithProps` method (this is called during the parent-component's `render` method)
 *
 * The PureWidget does a shallow comparison of `Props` and `State` against the previously executed
 */
export default abstract class PureWidget<T, S> {
    private renderedProps: T | undefined = undefined;
    private renderedState: S | undefined = undefined;
    protected props: T;

    /**
     * When creating your own components, in the constructor,
     * create your own child components or domElements
     */
    protected constructor(protected state: S) {}

    protected setState(newState: S) {
        this.state = newState;
        this.executeRenderIfChanged();
    }

    /**
     * Do a shallow comparison of props and state.
     * To save resources; we don't want to render if nothing has changed materially.
     */
    private shouldWidgetUpdate() {
        return (
            !shallowEqual(this.props, this.renderedProps) ||
            !shallowEqual(this.state, this.renderedState)
        );
    }

    public renderWithProps(newProps: T): void {
        this.props = newProps;
        this.executeRenderIfChanged();
    }

    private executeRenderIfChanged() {
        if (this.shouldWidgetUpdate()) {
            this.render();
            this.renderedProps = this.props;
            this.renderedState = this.state;
        }
    }

    /**
     * Implement this method to use this.props and this.state and render the updated children:
     * - adjust child DOM elements created in the constructor (e.g.: style, attributes)
     * - render child widgets using `child.executeRender`
     */
    protected abstract render(): void;
}

// from https://stackoverflow.com/questions/36084515/how-does-shallow-compare-work-in-react
function shallowEqual(objA: any, objB: any) {
    if (!objA || !objB) {
        return objA === objB;
    }
    if (objA === objB) {
        return true;
    }
    return !Boolean(
        Object.keys(Object.assign({}, objA, objB)).find(
            key => objA[key] !== objB[key]
        )
    );
}
