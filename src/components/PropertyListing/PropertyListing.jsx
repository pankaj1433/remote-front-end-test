import React from 'react';
import PropertyCard from '../PropertyCard';
import useGetProperties from '../../hooks/useGetProperties';

import './PropertyListing.scss';

const PropertyListing = () => {
    const { properties, loading, error } = useGetProperties();
    
    if(loading)
        return <div>Loading...</div>;
    if(error)
        return <div>OOPS! Something went wrong</div>

    return (
        <ul className="PropertyListing">
            {   properties.map((property, index) => (
                    <li key={index}>
                        <PropertyCard {...property} />
                    </li>
                ))}
        </ul>
    );
};

export default PropertyListing;
