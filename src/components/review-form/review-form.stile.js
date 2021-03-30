import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 568px;
  height: 92px;
  margin-bottom: 12px;
  padding: 15px 16px;
  font-size: 16px;
  line-height: 1.1875;
  color: #383838;
  background-color: #fff;
  border: ${({warningStyle}) => warningStyle ? warningStyle : `1px solid #e6e6e6`};
  border-radius: 2px;
  -webkit-input-placeholder {
    font-size: 16px;
    line-height: 1.1875;
    color:#9b9b9b
  }
  -moz-placeholder {
    font-size: 16px;
    line-height: 1.1875;
    color: #9b9b9b
  }
  -ms-input-placeholder {
    font-size: 16px;
    line-height: 1.1875;
    color:#9b9b9b
  }
  placeholder {
    font-size: 16px;
    line-height: 1.1875;
    color:#9b9b9b
  }
  -ms-input-placeholder{
    font-size: 16px;
    line-height: 1.1875;
    color:#9b9b9b
  }
`;
