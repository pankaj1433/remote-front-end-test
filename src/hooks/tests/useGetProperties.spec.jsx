import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useGetProperties from '../useGetProperties';

const MOCK_PROPERTIES = [
    {
        id: 73864112,
        bedrooms: 3,
        summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
        displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
        propertyType: 'Flat',
        price: 1950000,
        branchName: 'M2 Property, London',
        propertyUrl: '/property-for-sale/property-73864112.html',
        contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
        propertyTitle: '3 bedroom flat for sale',
        mainImage:
            'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
    }
];

const TestComponent = () => {
    const { properties, error, loading } = useGetProperties();

    return (
        <div>
            {loading && <div data-testid="loading">Loading...</div>}
            {error && <div data-testid="error">OOPS! Something went wrong</div>}
            {properties && properties.map((property) => (
                <div key={property.id} data-testid="property">
                    <p>{property.displayAddress}</p>
                </div>
            ))}
        </div>
    );
};

describe('useGetProperties', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch properties successfully', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => MOCK_PROPERTIES,
        });

        render(<TestComponent />);

        expect(screen.queryByTestId('loading')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });

        expect(screen.queryByTestId('error')).not.toBeInTheDocument();
        expect(screen.getByText('1 CHEYNE WALK, CHELSEA, SW3')).toBeInTheDocument();
    });

    it('should handle fetch error', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<TestComponent />);

        expect(screen.getByTestId('loading')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByTestId('error')).toBeInTheDocument();
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });
    });
});
