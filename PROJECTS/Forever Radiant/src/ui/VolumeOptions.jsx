import React, { useState } from 'react';
import styled from 'styled-components';

const VolumeOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid rgb(222, 224, 225);
  background-color: rgb(232, 233, 235);
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #f0f0f0; /* Darker background on hover */
  }

  &.selected {
    border-color: rgb(245, 148, 92); 
  }
`;

const VolumeOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const VolumeOptions = () => {
  const [selectedVolume, setSelectedVolume] = useState('');
  const volumes = ['20ml', '50ml', '100ml', '200ml'];

  return (
    <VolumeOptionsContainer>
      {volumes.map((volume, i) => (
        <VolumeOption
          key={i}
          className={selectedVolume === volume ? 'selected' : ''}
          onClick={() => setSelectedVolume(volume)}
        >
        {volume}
        </VolumeOption>
      ))}
    </VolumeOptionsContainer>
  );
};

export default VolumeOptions;
