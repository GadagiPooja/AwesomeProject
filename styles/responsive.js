import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const rS = (size) => {
    return scale(size);
};

export const rV = (size) => {
    return verticalScale(size);
};

export const rmS = (size, factor) => {
    return moderateScale(size, factor);
};
