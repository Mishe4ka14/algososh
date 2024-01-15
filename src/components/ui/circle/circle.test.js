import { Circle } from "./circle";
import React from "react";
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

it('circle без буквы рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с буквой рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle letter="T"/>)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с head рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle head='head' />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с react-элементом в head рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle head={<Circle />} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с tail рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle tail='tail' />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с реакт-элементом в tail рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle tail={<Circle />} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с index рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle index={1} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle с пропом isSmall ===  true рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle isSmall={true} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle в состоянии default рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle state={ElementStates.Default} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle в состоянии changing рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle state={ElementStates.Changing} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 

it('circle в состоянии modified рендерится без ошибок', () => {
    const circleWithoutLetter = renderer.create(<Circle state={ElementStates.Modified} />)
    expect(circleWithoutLetter).toMatchSnapshot();
}); 