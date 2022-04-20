const FileInput = () => {
    return <input 
                accept="image/*" 
                type="file" 
                id="select-image" 
                style={{ display: 'none' }}
            />;
};
  
export default FileInput;