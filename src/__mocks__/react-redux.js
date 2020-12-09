const mockDispatch = jest.fn()
const mockSelector = jest.fn()

const mockState = (state = {}) => {
    // return mockSelector.mockImplementation(callback => {
    //     return callback(state);
    // });

    return useSelector.mockImplementation(callback => {
        return callback(mockAppState);
    });
}

module.exports = {
    ...jest.requireActual('react-redux'),
    __esModule: true,
    useSelector: mockSelector,
    useDispatch: () => mockDispatch,
    mockDispatch,
    mockState
};