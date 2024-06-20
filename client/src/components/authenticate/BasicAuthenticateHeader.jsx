import * as Selector from "../ui/selector";

const BasicAuthenticateHeader = ({ defaultValue, title = undefined }) => {
  if (!title) throw new Error("<BasicAuthenticateHeader> must have a 'title'");

  return (
    <Selector.Group defaultValue={defaultValue}>
      <Selector.Item asChild value={defaultValue} className="pl-4 border-b-0">
        <span>{title}</span>
      </Selector.Item>
    </Selector.Group>
  );
};

export default BasicAuthenticateHeader;
