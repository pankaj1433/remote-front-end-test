import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';
import useGetProperties from '../../../hooks/useGetProperties';

jest.mock('../../../hooks/useGetProperties');

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
    },
    {
        id: 73864113,
        bedrooms: 2,
        summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
        displayAddress: '2 CHEYNE WALK, CHELSEA, SW3',
        propertyType: 'Flat',
        price: 2950000,
        branchName: 'M2 Property, London',
        propertyUrl: '/property-for-sale/property-73864112.html',
        contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
        propertyTitle: '3 bedroom flat for sale',
        mainImage:
            'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
    }
];

const mockuseGetProperties = jest.mocked(useGetProperties);

mockuseGetProperties.mockReturnValue({
    properties: MOCK_PROPERTIES,
    error: null,
    loading: false,
});

describe('PropertyListing', () => {
    it('should render two property cards', async () => {
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(2);
    });
});
