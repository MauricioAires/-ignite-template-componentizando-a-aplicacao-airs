import { memo } from 'react';
import { Star, Clock } from 'react-feather';

const IconStar = memo(Star)
const IconClock = memo(Clock)

export { IconClock, IconStar}